public interface IAiService
{
    Task<string> GetLessonAsync(string category, string subCategory, string prompt);
}