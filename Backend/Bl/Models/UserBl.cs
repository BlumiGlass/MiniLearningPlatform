namespace Bl.Models
{
    public class UserBl
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Phone { get; set; } = "";
        public List<PromptBl> Prompts { get; set; } = new();
    }
}
