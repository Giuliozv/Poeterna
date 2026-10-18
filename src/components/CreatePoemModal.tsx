import React, { useState } from 'react';
import { Poem } from '../types';

interface CreatePoemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCustomPoem: (poem: Poem) => void;
}

export const CreatePoemModal: React.FC<CreatePoemModalProps> = ({
  isOpen,
  onClose,
  onSaveCustomPoem
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [theme, setTheme] = useState('Amor & Saudade');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Por favor preencha o título e os versos do poema.');
      return;
    }

    const newPoem: Poem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      poetId: 'usuario-autor',
      poetName: author.trim() || 'Poeta Anónimo',
      country: 'PT',
      countryName: 'Lusofonia',
      year: new Date().getFullYear().toString(),
      stanzas: content.split('\n'),
      era: 'Contemporâneos',
      theme,
      analysis: 'Poema de autoria pessoal guardado no caderno da Lira Lusófona.'
    };

    onSaveCustomPoem(newPoem);
    onClose();
    setTitle('');
    setAuthor('');
    setContent('');
  };

  const handleInspireMe = () => {
    const inspirations = [
      {
        t: 'Cântico do Sal',
        a: 'Inspiração Lira',
        c: 'O mar traz na espuma o mistério antigo,\nE na brisa serena um cântico amigo.\nPassam as eras, perdem-se os ais,\nMas a poesia permanecerá jamais.'
      },
      {
        t: 'Luz da Tarde em Lisboa',
        a: 'Inspiração Lira',
        c: 'A luz douro suave sobre as pedras do calçamento,\nO tejo reflete o silêncio do pensamento.\nNo peito uma saudade doce de sentir,\nDe quem aprendeu a amar sem ter de partir.'
      }
    ];

    const pick = inspirations[Math.floor(Math.random() * inspirations.length)];
    setTitle(pick.t);
    setAuthor(pick.a);
    setContent(pick.c);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#faf2db] text-[#1f1a14] border border-[#523816]/30 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col rounded-sm">
        {/* Header */}
        <div className="p-4 bg-[#f6ebd1] border-b border-[#523816]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1e3a8a]">edit_note</span>
            <h3 className="font-cormorant font-semibold text-2xl text-[#1f1a14]">
              Lira Criativa — Novo Poema
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#1f1a14] border border-[#523816]/20 hover:border-[#1e3a8a] transition-colors cursor-pointer rounded-xs"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 bg-[#faf2db]">
          <div>
            <label className="block label mb-1.5">
              Título do Poema *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Cântico ao Mar"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#f4e9cd] border border-[#523816]/25 font-cormorant text-2xl text-[#1f1a14] focus:outline-none focus:border-[#1e3a8a] rounded-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block label mb-1.5">
                Autor / Pseudónimo
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 bg-[#f4e9cd] border border-[#523816]/25 font-mono text-xs text-[#1f1a14] focus:outline-none focus:border-[#1e3a8a] rounded-xs"
              />
            </div>

            <div>
              <label className="block label mb-1.5">
                Tema
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-3 py-2 bg-[#f4e9cd] border border-[#523816]/25 font-mono text-xs text-[#1f1a14] focus:outline-none focus:border-[#1e3a8a] rounded-xs cursor-pointer"
              >
                <option value="Amor & Saudade">Amor & Saudade</option>
                <option value="Mar & Natureza">Mar & Natureza</option>
                <option value="Existência & Alma">Existência & Alma</option>
                <option value="Identidade Lusófona">Identidade Lusófona</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block label mb-0">
                Versos / Estrofes *
              </label>
              <button
                type="button"
                onClick={handleInspireMe}
                className="font-mono text-xs text-[#1e3a8a] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-xs">auto_awesome</span>
                Inspirar Versos
              </button>
            </div>
            <textarea
              required
              rows={6}
              placeholder={`Escreva aqui os seus versos...\n\nCada linha será uma estrofe do seu poema.`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 bg-[#f4e9cd] border border-[#523816]/25 font-serif text-lg italic text-[#1f1a14] focus:outline-none focus:border-[#1e3a8a] resize-none rounded-xs"
            />
          </div>

          <div className="p-3 border border-[#523816]/15 bg-[#f4e9cd] font-mono text-xs text-[#1f1a14]/75 flex items-center gap-2 rounded-xs">
            <span className="material-symbols-outlined text-sm text-[#1e3a8a]">info</span>
            <span>O seu poema ficará guardado no seu caderno pessoal de favoritos.</span>
          </div>

          <div className="pt-2 flex justify-end gap-3 font-mono text-xs uppercase">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">bookmark_add</span>
              Guardar Poema
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

