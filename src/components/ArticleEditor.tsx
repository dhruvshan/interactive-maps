

function ArticleEditor({ name, date }:{name: string, date:string}){
    return (
      <p className="text-gray-500">
        <em>Article by {name}, on {date}</em>
      </p>
    );
  };
  
export default ArticleEditor;
  