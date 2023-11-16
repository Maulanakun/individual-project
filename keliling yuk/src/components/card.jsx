import { useNavigate, useParams } from "react-router";

const Card = ({ destination, loading }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const onclick = (id) => {
    navigate(`/destination/${id}`);
  };
  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div role="status" className="">
            <svg
              aria-hidden="true"
              className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ... (Your SVG paths) */}
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {destination.map((el, index) => (
        <div
          key={index}
          className="card card-compact w-96 bg-base-100 shadow-xl"
        >
          <figure>
            <img
              src={el.imgUrl}
              alt="wisata"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{el.tujuan}</h2>
            <p>budget diperlukan {el.budget}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => onclick(el.id)}
              >
                Lihat Destinasi
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Card;
