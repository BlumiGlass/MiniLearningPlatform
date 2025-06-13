using Dal.Data;
using Dal.Interfaces;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext dbContext;
    public UserService(ApplicationDbContext context)
    {
        dbContext = context;
    }
    public User Create(User entity)
    {
        dbContext.Users.Add(entity);
        dbContext.SaveChanges();
        return entity;
    }

    public void Delete(int id)
    {
        var user = dbContext.Users.Find(id);
        if (user != null)
        {
            dbContext.Users.Remove(user);
            dbContext.SaveChanges();
        }
        else
        {
            throw new KeyNotFoundException($"User with ID {id} not found.");
        }
    }

    public User Read(int id)
    {
        var user = dbContext.Users.Find(id);
        return user;
    }

    public List<User> ReadAll()
    {
        return dbContext.Users.ToList();
    }

    public User Update(User entity)
    {
        var user = dbContext.Users.Find(entity.Id);
        if (user != null)
        {
            user.Name = entity.Name;
            user.Phone = entity.Phone;
            return user;
        }
        else
        {
            throw new KeyNotFoundException($"User with ID {entity.Id} not found.");
        }
    }
}
