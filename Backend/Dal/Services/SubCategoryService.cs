using Dal.Data;
using Dal.Interfaces;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services;

public class SubCategoryService : ISubCategoryService
{
    private readonly ApplicationDbContext dbContext;
    public SubCategoryService(IDal dal)
    {
        dbContext = dal.Context;
    }
    public SubCategory Create(SubCategory entity)
    {
        dbContext.SubCategories.Add(entity);
        dbContext.SaveChanges();
        return entity;
    }

    public void Delete(int id)
    {
        var subCategory = dbContext.SubCategories.Find(id);
        if (subCategory != null)
        {
            dbContext.SubCategories.Remove(subCategory);
            dbContext.SaveChanges();
        }
        else
        {
            throw new KeyNotFoundException($"SubCategory with ID {id} not found.");
        }   
    }

    public SubCategory Read(int id)
    {
        var category = dbContext.SubCategories.Find(id);
        if (category != null)
        {
            return category;
        }
        else
        {
            throw new KeyNotFoundException($"SubCategory with ID {id} not found.");
        }
    }

    public List<SubCategory> ReadAll()
    {
        return dbContext.SubCategories.ToList();
    }

    public SubCategory Update(SubCategory entity)
    {
        var subCategory = dbContext.SubCategories.Find(entity.Id);
        if (subCategory != null)
        {
            subCategory.Name = entity.Name;
            subCategory.CategoryId = entity.CategoryId;
            dbContext.SaveChanges();
            return subCategory;
        }
        else
        {
            throw new KeyNotFoundException($"SubCategory with ID {entity.Id} not found.");
        }
    }
}
