using BassilApi.Models;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Course
        
    {

        public int CourseId { get; set; }
        [Required]
        public string? CourseName { get; set; }
        [Required]
        public string? Type { get; set; }
        [Range(1,5)]
        [Required]
        public int Grade { get; set; }
        [Required]
        public string? CourseImg { get; set; }


        public List<Lecture>? Lectures { get; set; } 
    }
}
