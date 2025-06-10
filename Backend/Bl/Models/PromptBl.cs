using System;

namespace Bl.Models
{
    public class PromptBl
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserBl? User { get; set; }
        public int CategoryId { get; set; }
        public CategoryBl? Category { get; set; }
        public int SubCategoryId { get; set; }
        public SubCategoryBl? SubCategory { get; set; }
        public string PromptText { get; set; } = "";
        public string Response { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
