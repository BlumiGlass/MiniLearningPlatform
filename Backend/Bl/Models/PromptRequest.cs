using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models;

public class PromptRequest
{
    public int UserId { get; set; }
    public int CategoryId { get; set; }
    public int SubCategoryId { get; set; }
    public string PromptText { get; set; } = "";
}
