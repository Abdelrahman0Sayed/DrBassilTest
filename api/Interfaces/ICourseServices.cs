using api.Dto.Course;
using api.Helpers;
using BassilApi.Models;
using Microsoft.Identity.Client;

namespace api.Interfaces
{
    public interface ICourseServices
    {
        public AllCoursesResponseDto GetAllCourses();
        public Task<List<CourseResponse2Dto>>? GetCourse(CourseQueryObject query);
        public Task<TutorialResponseDto> GetTutorial(string tutName);
        public Task<bool> AddCourse(AddCourseRequestDto addRequest);
        public Task<string> AddLecture(AddLectureRequestDto addRequest);
        public Task<bool> EditCourse(UpdateCourseInfoDto updateCourse);
        public Task<string> EditTutorial(UpdateTutorialInfoDto updatedTutorial);
        public Task<bool> DeleteCourse(string CourseName);
        public Task<bool> DeleteTutorial(string TutorialName);
    }
}
