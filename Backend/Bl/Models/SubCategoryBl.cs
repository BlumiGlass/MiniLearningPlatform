namespace Bl.Models
{
    public class SubCategoryBl
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public int CategoryId { get; set; }
        public CategoryBl? Category { get; set; }
    }
}
