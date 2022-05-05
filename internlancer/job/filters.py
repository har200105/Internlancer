from django_filters import rest_framework as filters
from . models import Job


class JobFilters(filters.FilterSet):

    keyword = filters.CharFilter(field_name='title', lookup_expr='icontains')
    location = filters.CharFilter(
        field_name='address', lookup_expr='icontains')
    min_salary = filters.NumberFilter(
        field_name='salary' or 0, lookup_expr='gte')
    max_salary = filters.NumberFilter(
        field_name='salary' or 100000, lookup_expr='lte')

    class Meta:
        model = Job
        fields = ('education', 'jobType', 'experience',
                  'min_salary', 'max_salary', 'keyword', 'location')
