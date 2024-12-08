namespace day6_cs;

public enum Direction { N, E, S, W }

public class Location
{
    public int Row { get; init; }
    public int Col { get; init; }
}

public class Position : Location
{
    public Direction Direction { get; set; }
}

public static class Program
{
    private static readonly Dictionary<Direction, (int row, int col)> Movement = new()
    {
        { Direction.N, (-1, 0) },
        { Direction.E, (0, 1) },
        { Direction.S, (1, 0) },
        { Direction.W, (0, -1) }
    };

    public static void Main()
    {
        var fileContents = File.ReadAllText("input.txt");
        var count = CountInfiniteLoopObstructions(fileContents);
        Console.WriteLine($"Loops: {count}");
    }

    private static (List<Location> visited, bool loopDetected) Walk(string input)
    {
        var (map, currentLoc) = ParseMap(input);
        return Walk(map, currentLoc);
    }

    private static (List<Location> visited, bool loopDetected)  Walk(char[][] map, Position currentLoc, List<Position>? obstructions = null)
    {
        obstructions ??= [];
        var visited = new List<Location> { currentLoc };
        var blocksReached = new List<Position>();

        var loopDetected = false;

        while (true)
        {
            var delta = Movement[currentLoc.Direction];
            var nextLoc = new Position
            {
                Row = currentLoc.Row + delta.row,
                Col = currentLoc.Col + delta.col,
                Direction = currentLoc.Direction
            };

            if (!InBounds(nextLoc, map))
            {
                break;
            }

            var mapValue = map[nextLoc.Row][nextLoc.Col];
            if (obstructions.Any(x => PositionEquals(x, nextLoc)))
            {
                mapValue = 'O';
            }
            
            switch (mapValue)
            {
                case '.':
                    if (!visited.Any(x => LocationEquals(x, nextLoc)))
                    {
                        visited.Add(new Location { Col = nextLoc.Col, Row = nextLoc.Row });
                    }
                    currentLoc = nextLoc;
                    break;
                case '#':
                case 'O':                
                    blocksReached.Add(new Position { Col = currentLoc.Col, Row = currentLoc.Row, Direction = currentLoc.Direction });
                    currentLoc.Direction = TurnRight(currentLoc.Direction);
                    break;
            }

            if (blocksReached.Any(x => PositionEquals(x, currentLoc)))
            {
                loopDetected = true;
                break;
            }
        }

        return (visited, loopDetected);
    }

    private static int CountInfiniteLoopObstructions(string input)
    {
        var (visited, _) = Walk(input);
        var loopsFound = 0;

        Console.WriteLine("Route nodes walked:" + visited.Count);
        var (map, currentLoc) = ParseMap(input);
        
        Console.WriteLine("Map is " + map.Length + "x" + map[0].Length);

        var tasks = new List<Task>();
        
        for (var row = 0; row < map.Length; row++)
        for (var col = 0; col < map[0].Length - 1; col++)
        {
            if (map[row][col] != '.')
            {
                continue;
            }
            
            var location = new Location { Row = row, Col = col };
            var row1 = row;
            var col1 = col;
            var task = Task.Run(() =>
            {
                List<Position> obstructions = [new() { Row = location.Row, Col = location.Col }];
                var walkResult = Walk(map, currentLoc, obstructions);

                if (walkResult.loopDetected)
                {
                    Interlocked.Increment(ref loopsFound);
                }
                
                Console.SetCursorPosition(0, 0);
                var message = $"Loops found: {loopsFound} ({row1}, {col1})";
                var spacing = new string(' ', Console.WindowWidth - message.Length);
                Console.Write(message + spacing);
            });

            tasks.Add(task);
        }
        
        Task.WaitAll([.. tasks]);
        
        return loopsFound;
    }

    private static (char[][] map, Position currentLoc) ParseMap(string input, bool removeStart = true)
    {
        var map = input.Split('\n').Select(r => r.ToCharArray()).ToArray();
        var (row, col) = FindStartPosition(map);

        if (removeStart)
        {
            map[row][col] = '.';
        }

        return (map, new Position { Row = row, Col = col, Direction = Direction.N });
    }

    private static (int row, int col) FindStartPosition(char[][] map)
    {
        var startRow = Array.FindIndex(map, row => row.Contains('^'));
        var startCol = Array.IndexOf(map[startRow], '^');
        return (startRow, startCol);
    }

    private static bool LocationEquals(Location a, Location b) => a.Row == b.Row && a.Col == b.Col;
    private static bool PositionEquals(Position a, Position b) => LocationEquals(a, b) && a.Direction == b.Direction;

    private static bool InBounds(Location position, char[][] map) =>
        position.Row >= 0 && position.Row < map.Length && position.Col >= 0 && position.Col < map[0].Length;

    private static Direction TurnRight(Direction direction) =>
        (Direction)(((int)direction + 1) % 4);
}
