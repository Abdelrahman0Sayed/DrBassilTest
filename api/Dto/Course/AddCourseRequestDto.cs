namespace api.Dto.Course
{
    public class AddCourseRequestDto
    {
        public string? CourseName { get; set; }
        public int Grade { get; set; }
        public string? Type { get; set; }
        public string? CourseImg64 { get; set; }
    }
}
