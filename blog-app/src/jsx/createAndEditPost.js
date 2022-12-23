export const createAndEditPostJsx = (
  handleSubmit,
  title,
  setTitle,
  text,
  setText,
  error
) => {
  return (
    <div class="container">
      <form onSubmit={handleSubmit}>
        <div class="form-row">
          <label for="exampleFormControlInput1">Title</label>
          <input
            type="text"
            class="form-control form-control-lg"
            id="exampleFormControlInput1"
            placeholder="Post title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>

        <div class="form-row">
          <label for="exampleFormControlTextarea1">Post Text</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="15"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          ></textarea>
        </div>
        <button class="btn btn-primary mt-4 " type="submit">
          Submit post
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};
