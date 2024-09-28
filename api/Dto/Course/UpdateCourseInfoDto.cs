using System.ComponentModel.DataAnnotations;

namespace api.Dto.Course
{
    public class UpdateCourseInfoDto
    {
        // Add as parameter in fetching function in FRONT-END.
        [Required]
        public string? CurrentCourseName { get; set; }

        public string? UpdatedCourseName { get; set; }
        public string? UpdatedType { get; set; }
        public int UpdatedGrade { get; set; }
        public string? UpdatedCourseImg { get; set; }
    }
}
