async function buscarPersonaje() {
    const nombre = document.getElementById('searchInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Buscando...';
  
    try {
      const response = await fetch(`/characters/${nombre}`);
      if (!response.ok) throw new Error('Personaje no encontrado');
  
      const character = await response.json();
  
      resultDiv.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
        <p><strong>Status:</strong> ${character.status}</p>
        <p><strong>Species:</strong> ${character.species}</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>Origin:</strong> ${character.origin.name}</p>
      `;
    } catch (error) {
      resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
  }
  