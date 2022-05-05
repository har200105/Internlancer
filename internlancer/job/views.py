from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from job.filters import JobFilters
from rest_framework import status

from rest_framework.pagination import PageNumberPagination

from rest_framework.permissions import IsAuthenticated


from job.serializers import CandidatesAppliedSerializer, JobSerializer
from .models import CandidatesApplied, Job

from django.db.models import Max, Min, Avg, Count


@api_view(['GET'])
def getAllJobs(request):

    # jobs = Job.objects.all()
    filterset = JobFilters(
        request.GET, queryset=Job.objects.all().order_by('id'))

    resPerPage = 3

    paginator = PageNumberPagination()
    paginator.page_size = resPerPage

    queryset = paginator.paginate_queryset(filterset.qs, request)

    serializer = JobSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getJobById(request, pk):
    # job = Job.objects.get(id=pk)
    job = get_object_or_404(Job, id=pk)
    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def newJob(request):
    data = request.data
    job = Job.objects.create(data)
    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteJob(request, pk):
    job = get_object_or_404(Job, id=pk)
    job.delete()
    return Response({"message": "Job Deleted Successfully"})


@api_view(['GET'])
def getTopicStats(request, topic):

    args = {'title__icontains': topic}
    jobs = Job.objects.filter(**args)

    if len(jobs) == 0:
        return Response({'message': 'No stats found for {topics}'.format(topic=topic)})

    stats = jobs.aggregate(
        total_jobs=Count('title'),
        avg_positions=Avg('positions'),
        avg_salary=Avg('salary'),
        min_salary=Min('salary'),
        max_salary=Max('salary')
    )

    return Response(stats)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def applyToJob(request, pk):

    user = request.user
    job = get_object_or_404(Job, id=pk)

    if user.userprofile.resume == "":
        return Response({'error': 'Please upload your resume'},
                        status=status.HTTP_400_BAD_REQUEST)

    if job.lastDate < timezone.now():
        return Response({
            'error': 'Job Expired.'
        }, status=status.HTTP_400_BAD_REQUEST)

    alreadyApplied = job.candidatesapplied_set.filter(user=user).exists()

    if alreadyApplied:
        return Response({'error': "You have already applied to this job"},
                        status=status.HTTP_400_BAD_REQUEST)

    jobApplied = CandidatesApplied.objects.create(
        job=job,
        user=user,
        resume=user.userprofile.resume
    )

    return Response({
        'applied': True,
        'job_id': jobApplied.id
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def applyToJob(request):

    args = {'user_id': request.user.id}

    jobs = CandidatesApplied.objects.filter(**args)

    serializer = CandidatesAppliedSerializer(jobs, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def isApplied(request, pk):

    user = request.user

    job = get_object_or_404(Job, id=pk)
    applied = job.candidatesapplied._set.filter(user=user).exists()
    return Response(applied)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCurrentUserJobs(request):

    args = {'user': request.user.id}

    jobs = Job.objects.filter(**args)
    serializer = JobSerializer(jobs, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCandidatesApplied(request, pk):

    user = request.user

    job = get_object_or_404(Job, id=pk)

    if job.user != user:

        return Response({
            'error': 'You cannot access this job'
        }, status=status.HTTP_403_FORBIDDEN)

    candidates = job.candidatesapplied_set.all()

    serializer = CandidatesAppliedSerializer(candidates, many=True)

    return Response(serializer.data)
