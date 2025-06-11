using Bl.Interfaces;
using Bl.Models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PromptsController : ControllerBase
{
    private readonly IPromptServiceBl _promptService;

    public PromptsController(IBl bl)
    {
        _promptService = bl.PromptService;
    }

    [HttpPost]
    public async Task<ActionResult<PromptBl>> CreatePrompt([FromBody] PromptRequest request)
    {
        var prompt = await _promptService.CreatePromptAsync(request.UserId, request.CategoryId, request.SubCategoryId, request.PromptText);
        return Ok(prompt);
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<List<PromptBl>>> GetUserPrompts(int userId)
    {
        var prompts = await _promptService.GetUserPrompts(userId);
        return Ok(prompts);
    }
}
