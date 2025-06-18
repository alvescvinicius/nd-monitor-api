export function parseProduto(produtoStr: string): { codigo: string; descricao: string } {
    const [codigo, ...resto] = produtoStr.split(' - ');
    return {
      codigo: codigo.trim(),
      descricao: resto.join(' - ').trim()
    };
  }
  