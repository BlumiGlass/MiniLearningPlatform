using Bl.Models;

namespace Bl.Interfaces;

public interface IUserServiceBl
{
    List<UserBl> GetAllUsers();
    UserBl GetUserById(int userId);
    UserBl CreateUser(int id, string username, string phone);
}
