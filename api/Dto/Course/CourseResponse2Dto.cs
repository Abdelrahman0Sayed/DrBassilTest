using BassilApi.Models;

namespace api.Dto.Course
{
    public class CourseResponse2Dto
    {
        public string? CourseName { get; set; }
        public string? CourseType { get; set; }
        public int TotalLectures { get; set; }
        public List<Lecture>? Tutorials { get; set; }
        public string? CourseImg { get; set; }
    }
}
