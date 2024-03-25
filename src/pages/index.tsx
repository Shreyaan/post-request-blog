function PostCard({
  title,
  description,
  onClick,
  buttonText,
}: {
  title: string;
  description: string;
  onClick: () => void;
  buttonText: string;
}) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button onClick={onClick} className="btn btn-primary">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
function GetCard({
  title,
  description,
  link,
  buttonText,
}: {
  title: string;
  description: string;
  link: string;

  buttonText: string;
}) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <a href={link} download className="btn btn-primary">
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="container h-screen mx-auto px-4">
      <div className="flex md:justify-between flex-wrap pt-10 gap-10">
        <GetCard
          title="Get request ( return file )"
          description="This button when pressed will just call `GET` request to get file from server which returns the file in response."
          buttonText="Click Here"
          link="https://post-request-blog.vercel.app/api/get?name=John%20Doe"
        />
        <PostCard
          title="Post request ( return file )"
          description="This button when pressed will just call `POST` request to get file from server which returns the file in response."
          buttonText="Click Here"
          onClick={async () => {
            const response = await fetch(
              "https://post-request-blog.vercel.app/api/post",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: "John Doe" }),
              }
            );
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "file.zip";
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        />
        <PostCard
          title="Post request ( return file url )"
          description="This button when pressed will just call `POST` request to get file from server which returns the file in response."
          buttonText="Click Here"
          onClick={async () => {
            const response = await fetch(
              "https://post-request-blog.vercel.app/api/post-url",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: "John Doe" }),
              }
            );
            const url = await response.text();
            window.open(url, "_blank");
          }}
        />
      </div>
    </div>
  );
}
