using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace api.Dto.Course
{
    public class AllTutorialsDto
    {
        public string? TutorialName { get; set; }
        public string? TutorialUrl { get; set; }
    }
}
