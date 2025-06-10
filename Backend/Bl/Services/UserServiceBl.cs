using Bl.Interfaces;
using Bl.Models;
using Dal.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Models;

namespace Bl.Services;

public class UserServiceBl : IUserServiceBl
{
    private readonly IUserService userService;
    public UserServiceBl(IDal dal)
    {
        userService = dal.UserService;
    }
    public UserBl CreateUser(int id, string username, string phone)
    {
        userService.Create(new User
        {
            Id = id,
            Name = username,
            Phone = phone
        });
        return new UserBl
        {
            Id = id,
            Name = username,
            Phone = phone
        };
    }

    public List<UserBl> GetAllUsers()
    {
        return userService.ReadAll().Select(u => new UserBl
        {
            Id = u.Id,
            Name = u.Name,
            Phone = u.Phone
        }).ToList();
    }

    public UserBl GetUserById(int userId)
    {
        return userService.Read(userId) is User user ? new UserBl
        {
            Id = user.Id,
            Name = user.Name,
            Phone = user.Phone
        } : null;
    }
}
