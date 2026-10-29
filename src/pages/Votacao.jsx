import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService';

function Votacao() {
  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [votosNaSessao, setVotosNaSessao] = useState(0);

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setVotosNaSessao((total) => total + 1);
  }

  return (
    <main className="pagina">
      <header className="pagina-topo">
        <h1>Quem você quer eliminar?</h1>
        <p>Cada clique conta um voto para tirar o peão da fazenda.</p>
      </header>

      {ultimoVoto !== null && (
        <p className="mensagem-voto" role="status">
          <span>
            Voto registrado para eliminar <strong>{ultimoVoto.nome}</strong>. Você já votou{' '}
            {votosNaSessao} {votosNaSessao === 1 ? 'vez' : 'vezes'}.
          </span>
          <Link to="/resultado">Ver resultado</Link>
        </p>
      )}

      <section className="grade-roca">
        {naRoca.map((p) => (
          <ParticipanteCard key={p.id} participante={p} onVotar={handleVotar} />
        ))}
      </section>

      <section className="secao-peoes">
        <h2>Demais peões</h2>
        <p>Fora da roça nesta semana, não podem receber votos.</p>

        <div className="grade-peoes">
          {foraDaRoca.map((p) => (
            <ParticipanteCard key={p.id} participante={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;
