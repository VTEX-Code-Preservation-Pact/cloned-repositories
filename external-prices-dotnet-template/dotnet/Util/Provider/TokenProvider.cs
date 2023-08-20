namespace service.Util.Provider
{
    public class TokenProvider : ITokenProvider
    {
        public string GetToken()
        {
            return "testToken";
        }
    }
}