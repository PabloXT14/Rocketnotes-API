module.exports = {
  // Indica que se um teste falhar não executa o restante dos testes
  bail: true,

  // Indica qual provedor deve ser usado para a cobertura/percorrer os códigos de teste
  coverageProvider: "v8",

  // Os padrões globais que Jest usará para detectar os arquivos de teste (<rootDir> = diretório raiz do projeto)
  testMatch: [
    "<rootDir>/src/**/*.spec.js",
  ],
};
