using api.Dto.Course;
using api.Helpers;
using api.Interfaces;
using BassilApi.data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseServices _courseServices;
        private readonly ApplicationDbContext _context;

        public CourseController(ICourseServices courseServices, ApplicationDbContext context)
        {
            _courseServices = courseServices;
            _context = context;
        }

        [Authorize(Policy = "AllUsersPolicy")]
        [HttpGet("GetAllCourses")]
        public async Task<IActionResult> GetAllCourses()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = _courseServices.GetAllCourses();
            if (response != null)
                return Ok(response);

            return NotFound();
        }

        [Authorize(Policy = "AllUsersPolicy")]
        [HttpPost("GetCourse")]
        public async Task<IActionResult> GetCourse([FromQuery] CourseQueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _courseServices.GetCourse(query);
            return Ok(response.FirstOrDefault());
        }

        [Authorize(Policy = "AllUsersPolicy")]
        [HttpGet("GetAllTutorials")]
        public async Task<IActionResult> GetAllTutorials()
        {
            var allTutorials = await _context.Lectures.Select(x => new AllTutorialsDto
            {
                TutorialName = x.LectureName,
                TutorialUrl = x.Url
            }).ToListAsync();
            return Ok(allTutorials);
        }

        [Authorize(Policy = "AllUsersPolicy")]
        [HttpGet("GetTutorial")]
        public async Task<IActionResult> GetTutorial(string tutorialName)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _courseServices.GetTutorial(tutorialName);
            if (response is null)
                return BadRequest("Lecture is not exist.");
            return Ok(response);
        }



        [Authorize(Policy ="AdminPolicy")]
        [HttpPost("AddCourse")]
        public async Task<IActionResult> AddCourse([FromBody] AddCourseRequestDto addCourseRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response =await _courseServices.AddCourse(addCourseRequest);
            if (!response)
                return BadRequest();

            return Ok();
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpPost("AddTutorial")]
        public async Task<IActionResult> AddTutorial([FromBody] AddLectureRequestDto addLecture)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _courseServices.AddLecture(addLecture);
            if (response != "")
                return BadRequest(response);

            return Ok();
        }


        [Authorize(Policy = "AdminPolicy")]
        [HttpPut("EditCourse")]
        public async Task<IActionResult> EditCourseAsync([FromBody] UpdateCourseInfoDto updateCourse)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _courseServices.EditCourse(updateCourse);
            if (!response)
                return BadRequest("Course not found");

            return Ok();
        }
        [Authorize(Policy = "AdminPolicy")]
        [HttpPut("EditTutorial")]
        public async Task<IActionResult> EditTutorialAsync([FromBody]UpdateTutorialInfoDto updateTutorial)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _courseServices.EditTutorial(updateTutorial);
            if (response != "")
                return BadRequest(response);

            return Ok();
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpDelete("DeleteTutorial")]
        public async Task<IActionResult> DeleteTutorialAsync(string TutorialName)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _courseServices.DeleteTutorial(TutorialName);
            if (!response)
                return BadRequest("Tutorial Not Found");

            return Ok();
        }
        [Authorize(Policy = "AdminPolicy")]
        [HttpDelete("DeleteCourse")]
        public async Task<IActionResult> DeleteCourseAsync(string CourseName)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var response = await _courseServices.DeleteCourse(CourseName);
            if (!response)
                return BadRequest("Course Not Found");

            return Ok();
        }
    }   
}
