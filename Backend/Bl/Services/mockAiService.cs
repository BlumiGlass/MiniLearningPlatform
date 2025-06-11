using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class MockAiService : IAiService
    {
        public Task<string> GetLessonAsync(string category, string subCategory, string prompt)
        {
            return Task.FromResult($"[Mock Lesson]\nCategory: {category}\nSubCategory: {subCategory}\nPrompt: {prompt}\nLesson: This is a generated lesson based on your input.");
        }
    }
}
