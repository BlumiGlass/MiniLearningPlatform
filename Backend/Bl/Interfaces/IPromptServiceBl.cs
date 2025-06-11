using Bl.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Interfaces;

public interface IPromptServiceBl
{
    Task<PromptBl> CreatePromptAsync(int userId, int categoryId, int subCategoryId, string promptText);
    Task<List<PromptBl>> GetUserPrompts(int userId);
}
