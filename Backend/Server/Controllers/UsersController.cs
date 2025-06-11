using Bl.Interfaces;
using Bl.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserServiceBl _userService;
        private readonly IConfiguration _configuration;
        public UsersController(IBl bl,IConfiguration configuration) 
        {
            _userService = bl.UserService;
            _configuration = configuration;
        }
        [HttpGet]
        public ActionResult<List<UserBl>> GetAllUsers()
        {
            var users = _userService.GetAllUsers();
            if (users == null || users.Count == 0)
            {
                return NotFound("No users found.");
            }
            return Ok(users);
        }

        [HttpGet("{userId}")]
        public ActionResult<UserBl> GetUserById(int userId)
        {
            var adminId= _configuration.GetSection("Admin").GetValue<int>("DefaultId");
            if (userId == adminId)
            {
                return Ok(new UserBl { Id = adminId, Name = "Admin", Phone = "1234567890" });
            }
            var user = _userService.GetUserById(userId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public ActionResult<UserBl> CreateUser([FromBody] UserBl request)
        {
            if (request == null || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Phone))
            {
                return BadRequest("Invalid user data.");
            }
            var user =  _userService.CreateUser(request.Id, request.Name, request.Phone);
            return user;
        }
    }
}
