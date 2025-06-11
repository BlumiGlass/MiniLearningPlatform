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
    public PromptServiceBl(IDal dal)
    {
        promptService = dal.PromptService;
    }
    public async Task<PromptBl> CreatePromptAsync(int userId, int categoryId, int subCategoryId, string promptText)
    {
        // Simulate AI response (replace with real OpenAI call)
        string aiResponse = $"AI lesson for: {promptText}";

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

    public List<PromptBl> GetUserPrompts(int userId)
    {
        return promptService.ReadByUserId(userId)
            .Select(p => new PromptBl
            {
                Id = p.Id,
                UserId = p.UserId,
                CategoryId = p.CategoryId,
                SubCategoryId = p.SubCategoryId,
                PromptText = p.PromptText,
                CreatedAt = p.CreatedAt
            }).ToList();
    }
}
