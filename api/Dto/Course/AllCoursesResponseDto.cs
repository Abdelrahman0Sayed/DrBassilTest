namespace api.Dto.Course
{
    public class AllCoursesResponseDto
    {
        public int TotalCourses { get; set; }
        public int TotalTutorials { get; set; }
        public List<CourseResponseDto>? Courses { get; set; }
    }
}
