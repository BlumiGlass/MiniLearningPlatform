using Dal.Data;
using Dal.Interfaces;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services;

public class PromptService : IPromptService
{
    private readonly ApplicationDbContext dbContext;
    public PromptService(ApplicationDbContext context)
    {
        dbContext = context;
    }
    public Prompt Create(Prompt entity)
    {
        dbContext.Prompts.Add(entity);
        dbContext.SaveChanges();
        return entity;
    }

    public void Delete(int id)
    {
        var prompt = dbContext.Prompts.Find(id);
        if (prompt != null)
        {
            dbContext.Prompts.Remove(prompt);
            dbContext.SaveChanges();
        }
        else
        {
            throw new KeyNotFoundException($"Prompt with ID {id} not found.");
        }
    }

    public Prompt Read(int id)
    {
        var prompt = dbContext.Prompts.Find(id);
        if (prompt == null)
        {
            throw new KeyNotFoundException($"Prompt with ID {id} not found.");
        }
        return prompt;
    }

    public List<Prompt> ReadAll()
    {
        return dbContext.Prompts.ToList();
    }

    public async Task<List<Prompt>> ReadByUserId(int userId)
    {
        return await dbContext.Prompts
            .Include(p => p.User)
            .Include(p => p.Category)
            .Include(p => p.SubCategory)
            .Where(p => p.UserId == userId)
            .ToListAsync();
    }



    public Prompt Update(Prompt entity)
    {
        var existingPrompt = dbContext.Prompts.Find(entity.Id);
        if (existingPrompt != null)
        {
            existingPrompt.Id = entity.Id;
            existingPrompt.UserId = entity.UserId;
            existingPrompt.SubCategoryId = entity.SubCategoryId;
            existingPrompt.PromptText = entity.PromptText;
            existingPrompt.CreatedAt = entity.CreatedAt;
            existingPrompt.CategoryId = entity.CategoryId;
            dbContext.SaveChanges();
            return existingPrompt;
        }
        else
        {
            throw new KeyNotFoundException($"Prompt with ID {entity.Id} not found.");
        }
    }
}
