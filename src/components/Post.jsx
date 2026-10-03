import { useState } from "react";
import { useSocial } from "./SocialContext";
import ShareButton from "./ShareButton";

function CommentForm({ onSubmit, placeholder }) {
  const [textoComentario, setTextoComentario] = useState("");

  function manejarEnvioComentario(evento) {
    evento.preventDefault();
    if (!textoComentario.trim()) return;
    onSubmit(textoComentario);
    setTextoComentario("");
  }

  return (
    <form className="comment-form" onSubmit={manejarEnvioComentario}>
      <input
        className="w3-input w3-border w3-round"
        value={textoComentario}
        onChange={(evento) => setTextoComentario(evento.target.value)}
        placeholder={placeholder}
      />
      <button type="submit" className="w3-button w3-theme w3-round">
        <i className="fa fa-send"></i>
      </button>
    </form>
  );
}

function Comment({ postId, comment, parentId = null }) {
  const { alternarMeGustaComentario, agregarComentario } = useSocial();
  const [estaRespondiendo, setEstaRespondiendo] = useState(false);

  return (
    <div className="comment">
      <img src={comment.avatar} alt="" className="w3-circle" />
      <div className="comment-body">
        <div className="w3-light-grey w3-round comment-bubble">
          <b>{comment.author}</b>
          <p>{comment.text}</p>
        </div>
        <div className="comment-actions w3-small">
          <button
            type="button"
            className={comment.liked ? "w3-text-theme" : "w3-opacity"}
            onClick={() => alternarMeGustaComentario(postId, comment.id, parentId)}
          >
            <i className="fa fa-thumbs-up"></i> {comment.likes}
          </button>
          {!parentId && (
            <button
              type="button"
              className="w3-opacity"
              onClick={() => setEstaRespondiendo(!estaRespondiendo)}
            >
              Reply
            </button>
          )}
        </div>
        {(comment.replies || []).map((respuestaItem) => (
          <Comment
            key={respuestaItem.id}
            postId={postId}
            comment={respuestaItem}
            parentId={comment.id}
          />
        ))}
        {estaRespondiendo && (
          <CommentForm
            placeholder={`Reply to ${comment.author}...`}
            onSubmit={(textoRespuesta) => {
              agregarComentario(postId, textoRespuesta, comment.id);
              setEstaRespondiendo(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function Post({ post }) {
  const { alternarMeGusta, agregarComentario } = useSocial();
  const [mostrarComentarios, setMostrarComentarios] = useState(false);

  const totalComentarios = post.comments?.length || 0;
  const listaComentarios = post.comments || [];

  return (
    <div id={post.id} className="w3-container w3-card w3-white w3-round w3-margin">
      <br />
      <img
        src={post.author.avatar}
        alt="Avatar"
        className="w3-left w3-circle w3-margin-right"
        style={{ width: 60 }}
      />
      <span className="w3-right w3-opacity">{post.createdAt}</span>
      <h4>{post.author.name}</h4>
      <br />
      <hr className="w3-clear" />
      {post.title && <p>{post.title}</p>}
      {post.featuredImage && (
        <img
          src={post.featuredImage.src}
          alt={post.featuredImage.alt}
          style={{ width: "100%" }}
          className="w3-margin-bottom"
        />
      )}
      <p>{post.text}</p>
      {post.images?.length > 0 && (
        <div className="w3-row-padding" style={{ margin: "0 -16px" }}>
          {post.images.map((imagenItem, indiceImagen) => (
            <div key={indiceImagen} className="w3-half">
              <img
                src={imagenItem.src}
                style={{ width: "100%" }}
                alt={imagenItem.alt}
                className="w3-margin-bottom"
              />
            </div>
          ))}
        </div>
      )}
      <div className="post-actions w3-margin-bottom">
        <button
          type="button"
          className={`w3-button ${post.liked ? "w3-theme-d4" : "w3-theme-d1"}`}
          onClick={() => alternarMeGusta(post.id)}
        >
          <i className="fa fa-thumbs-up"></i>  {post.liked ? "Liked" : "Like"} ({post.likes})
        </button>
        <button
          type="button"
          className="w3-button w3-theme-d2"
          onClick={() => setMostrarComentarios(!mostrarComentarios)}
        >
          <i className="fa fa-comment"></i>  Comment ({totalComentarios})
        </button>
        <ShareButton post={post} />
      </div>

      {mostrarComentarios && (
        <div className="w3-margin-bottom">
          {listaComentarios.map((comentarioItem) => (
            <Comment key={comentarioItem.id} postId={post.id} comment={comentarioItem} />
          ))}
          <CommentForm
            placeholder="Write a comment..."
            onSubmit={(nuevoTexto) => agregarComentario(post.id, nuevoTexto)}
          />
        </div>
      )}
    </div>
  );
}
