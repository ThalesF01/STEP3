var dados = {
  eletronicos: {
    Apple: {
      AppleWatch: [10, 13, 15, 12],
      MacBook: [5, 8, 10, 6],
      Iphone : [15, 10, 12, 18]
    },
    Samsumg: {
      SmartPhone: [18, 20, 17, 15],
      Televisão: [10, 12, 14, 16],
      Computadores: [8, 6, 10, 12]
    },
    Microsoft: {
      Xbox: [6, 8, 10, 12],
      Softwares: [15, 12, 18, 20],
      Computadores: [20, 18, 15, 10]
    }
  },
  vestuario: {
    Nike: {
      Chuteira: [10, 11, 7, 5],
      Bola: [7, 14, 18, 15],
      Camisa: [10, 12, 15, 8]
    },
    Adidas: {
      Short: [10, 12, 8, 6],
      Bermuda: [7, 4, 9, 8],
      Tenis: [10, 6, 7, 5]
    },
    Puma: {
      Meia: [15, 18, 12, 10],
      Bone: [8, 10, 6, 12],
      Camiseta: [22, 20, 25, 28]
    }
  },
  alimentos: {
    McDonalds: {
      BigMac: [5, 10, 8, 6],
      Batata: [12, 15, 10, 8],
      Nugget: [18, 11, 15, 12]
    },
    Starbucks: {
      Expresso: [10, 8, 12, 15],
      Cappuccino: [6, 5, 8, 10],
      Bolo: [15, 18, 4, 10]
    },
    CocaCola: {
      Suco: [9, 15, 8, 12],
      Refrigerante: [8, 10, 12, 15],
      Agua: [5, 6, 10, 8]
    }
  }
};

var selectCategoria = document.getElementById("selectCategoria");
var selectMarca = document.getElementById("selectMarca");
var selectProduto = document.getElementById("selectProduto");
var meuGrafico = null;

selectCategoria.addEventListener("change", function() {
  var categoriaSelecionada = selectCategoria.value;

  selectMarca.innerHTML = '<option value="">Selecione uma marca</option>';
  selectProduto.innerHTML = '<option value="">Selecione um produto</option>';

  if (categoriaSelecionada) {
    var marcas = Object.keys(dados[categoriaSelecionada]);
    marcas.forEach(function(marca) {
      var option = document.createElement("option");
      option.value = marca;
      option.textContent = marca;
      selectMarca.appendChild(option);
    });

    selectMarca.disabled = false;
  } else {
    selectMarca.disabled = true;
    selectProduto.disabled = true;
  }

  if (meuGrafico) {
    meuGrafico.destroy();
  }
});

selectMarca.addEventListener("change", function() {
  var categoriaSelecionada = selectCategoria.value;
  var marcaSelecionada = selectMarca.value;

  selectProduto.innerHTML = '<option value="">Selecione um produto</option>';

  if (marcaSelecionada) {
    var produtos = Object.keys(dados[categoriaSelecionada][marcaSelecionada]);
    produtos.forEach(function(produto) {
      var option = document.createElement("option");
      option.value = produto;
      option.textContent = produto;
      selectProduto.appendChild(option);
    });

    selectProduto.disabled = false;
  } else {
    selectProduto.disabled = true;
  }

  if (meuGrafico) {
    meuGrafico.destroy();
  }
});

selectProduto.addEventListener("change", function() {
  var categoriaSelecionada = selectCategoria.value;
  var marcaSelecionada = selectMarca.value;
  var produtoSelecionado = selectProduto.value;

  if (meuGrafico) {
    meuGrafico.destroy();
  }

  var ctx = document.getElementById("meuGrafico").getContext("2d");

  var dadosProduto = dados[categoriaSelecionada][marcaSelecionada][produtoSelecionado];

  meuGrafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril"],
      datasets: [
        {
          label: produtoSelecionado,
          data: dadosProduto,
          borderColor: '#36A2EB',
          backgroundColor: '#9BD0F5',          
          borderWidth: 5,
          barPercentage: 0.7, // Largura das barras
          categoryPercentage: 0.4, // Espaçamento entre as barras
        }
      ]
    },options: {
      layout: {
        padding: 25
    },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false, // Ocultar linhas de grade no eixo y
          },
          ticks: {
            font: {
              size: 14, // Tamanho da fonte do eixo y
            },
          },
        },
        x: {
          grid: {
            display: false, // Ocultar linhas de grade no eixo x
          },
          ticks: {
            font: {
              size: 14, // Tamanho da fonte do eixo x
            },
          },
        },
      },
      
    },
    
  });
});

var select = document.getElementById('mySelect');

select.addEventListener('click', function() {
  select.classList.toggle('open');
});