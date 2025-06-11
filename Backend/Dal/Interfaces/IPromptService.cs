using Dal.Models;

namespace Dal.Interfaces;

public interface IPromptService:ICrud<Prompt>
{
    Task<List<Prompt>> ReadByUserId(int userId);
}
