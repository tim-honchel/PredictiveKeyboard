using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectKeyboard
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
            
            
            Console.WriteLine("This application will determine the probabilities of the next letter in your string.");
            Console.WriteLine();

            var filepath = Directory.GetCurrentDirectory().Replace(@"bin\Debug\net5.0", @"Resources\dictionary.txt");
            var logFile = File.ReadAllLines(filepath);
            var wordList = new List<string>(logFile);
            
            
            var cont = true;

            while (cont == true)
            {
                cont = CalculateProbability();
            }

            bool CalculateProbability()
            {
                Console.Write("Enter a substring (or press enter to exit): ");
                var substring = Console.ReadLine();

                var shortList = new List<string>(wordList.Where(x => x.StartsWith(substring)));
                double wordCount = shortList.Count();
                Console.Write($"{wordCount} words begin with '{substring}'.");

                var nextLetter = new List<string>(shortList.Select(x => x.Substring(substring.Length)));

                Console.WriteLine(" Here is the frequency distribution of the letter that follows:");

                var letterList = "abcdefghijklmnopqrstuvwxyz";
                var results = new Dictionary<char, double>();
                double frequency = 0;

                foreach (var letter in letterList)
                {
                    frequency = Math.Round(nextLetter.Where(x => x.StartsWith(letter)).Count() / wordCount * 100, 1);
                    results.Add(letter, frequency);
                }

                var sortedResults = results.Where(x => x.Value > 0).OrderByDescending(x => x.Value);

                foreach (var letter in sortedResults)
                {
                    Console.WriteLine($"{letter.Key}: {letter.Value}%");
                }

                var hotKey = sortedResults.First().Key;

                var primaryKeys = sortedResults.Where(x => x.Value >= 10).OrderBy(x => x.Key);
                var secondaryKeys = sortedResults.Where(x => x.Value < 10 && x.Value > 0);
                var secondaryKey = secondaryKeys.First().Key;
                var tertiaryKeys = results.Where(x => x.Value == 0);
                var tertiaryKey = tertiaryKeys.First().Key;


                Console.Write($"For this substring, the hot key is {hotKey} and the primary keys are ");
                foreach (var letter in primaryKeys)
                {
                    Console.Write(letter.Key);
                }
                Console.WriteLine(".");
                Console.Write($"The secondary hot key is {secondaryKey} and the secondary keys are ");
                foreach (var letter in secondaryKeys.OrderBy(x => x.Key))
                {
                    Console.Write(letter.Key);
                }

                Console.WriteLine(".");
                Console.Write($"The tertiary hot key is {tertiaryKey} and the tertiary keys are ");
                foreach (var letter in tertiaryKeys)
                {
                    Console.Write(letter.Key);
                }

                Console.WriteLine();
                Console.WriteLine();

                return substring == "" ? false : true;
            }
            

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
