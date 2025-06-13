using Dal.Data;
using Dal.Interfaces;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services;

public class CategoryService : ICategoryService
{
    private readonly ApplicationDbContext dbContext;
    public CategoryService(ApplicationDbContext context)
    {
        dbContext = context;
    }
    public Category Create(Category entity)
    {
        var category = new Category()
        {
            Id = entity.Id,
            Name = entity.Name
        };
        dbContext.Categories.Add(category);
        dbContext.SaveChanges();
        return category;
    }

    public void Delete(int id)
    {
        var category = dbContext.Categories.Find(id);
        if (category != null)
        {
            dbContext.Categories.Remove(category);
            dbContext.SaveChanges();
        }
        else
        {
            throw new KeyNotFoundException($"Category with ID {id} not found.");
        }
    }

    public Category Read(int id)
    {
        var category = dbContext.Categories.Find(id);
        if (category == null)
        {
            throw new KeyNotFoundException($"Category with ID {id} not found.");
        }
        return category;
    }

    public List<Category> ReadAll()
    {
        return dbContext.Categories.ToList();
    }

    public Category Update(Category entity)
    {
        var category = dbContext.Categories.Find(entity.Id);
        if (category != null)
        {
            category.Name = entity.Name;
            category.Id = entity.Id;
            dbContext.Categories.Update(category);
            dbContext.SaveChanges();
            return category;
        }
        else
        {
            throw new KeyNotFoundException($"Category with ID {entity.Id} not found.");
        }
    }
}
