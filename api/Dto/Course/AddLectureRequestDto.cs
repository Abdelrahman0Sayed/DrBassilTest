using System.ComponentModel.DataAnnotations;

namespace api.Dto.Course
{
    public class AddLectureRequestDto
    {
        [Required]
        public string? TutorialName { get; set; }
        public string? TutorialLink { get; set; }
        public string? CourseName { get; set; }
    }
}
