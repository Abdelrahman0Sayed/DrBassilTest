namespace api.Dto.User
{
    public class AllUsersResponseDto
    {
        public int TotalUsers { get; set; }
        public List<UserResponseDto>? Users { get; set; }
    }
}
