using Bl.Interfaces;
using Bl.Models;
using Dal.Models;
using Dal.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services;

public class PromptServiceBl : IPromptServiceBl
{
    private readonly IPromptService promptService;
    private IDal dal;
    private readonly IAiService aiService;
    public PromptServiceBl(IDal dal, IAiService aiService)
    {
        promptService = dal.PromptService;
        this.dal = dal;
        this.aiService = aiService;
    }
    public async Task<PromptBl> CreatePromptAsync(int userId, int categoryId, int subCategoryId, string promptText)
    {
        var category = dal.CategoryService.Read(categoryId).Name??"Unknown";
        var subCategory = dal.SubCategoryService.Read(subCategoryId).Name ?? "Unknown";
        string aiResponse = await aiService.GetLessonAsync(category, subCategory, promptText);

        var prompt = new Prompt
        {
            UserId = userId,
            CategoryId = categoryId,
            SubCategoryId = subCategoryId,
            PromptText = promptText,
            Response = aiResponse,
            CreatedAt = DateTime.Now
        };

        promptService.Create(prompt);

        return new PromptBl()
        {
            Id = prompt.Id,
            UserId = prompt.UserId,
            CategoryId = prompt.CategoryId,
            SubCategoryId = prompt.SubCategoryId,
            PromptText = prompt.PromptText,
            Response = prompt.Response,
            CreatedAt = prompt.CreatedAt
        };
    }

    public async Task<List<PromptBl>> GetUserPrompts(int userId)
    {
        var prompts = await promptService.ReadByUserId(userId);
        return prompts
            .Select(p => new PromptBl
            {
                Id = p.Id,
                UserId = p.UserId,
                User = p.User == null ? null : new UserBl
                {
                    Id = p.User.Id,
                    Name = p.User.Name,
                    Phone = p.User.Phone
                },
                CategoryId = p.CategoryId,
                Category = p.Category == null ? null : new CategoryBl
                {
                    Id = p.Category.Id,
                    Name = p.Category.Name
                },
                SubCategoryId = p.SubCategoryId,
                SubCategory = p.SubCategory == null ? null : new SubCategoryBl
                {
                    Id = p.SubCategory.Id,
                    Name = p.SubCategory.Name
                },
                PromptText = p.PromptText,
                Response = p.Response,
                CreatedAt = p.CreatedAt
            }).ToList();
    }

}
