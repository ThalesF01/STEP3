var dados = {
  eletronicos: {
    Apple: {
      AppleWatch: [10, 13, 15, 12, 7, 11],
      MacBook: [5, 8, 10, 6, 9, 7],
      Iphone: [15, 10, 12, 18, 15, 11]
    },
    Samsumg: {
      SmartPhone: [18, 20, 17, 15, 11, 12],
      Televisão: [10, 12, 14, 16, 14, 13],
      Computadores: [8, 6, 10, 12, 10, 15]
    },
    Microsoft: {
      Xbox: [6, 8, 10, 12, 6, 9],
      Softwares: [15, 12, 18, 20, 7, 12],
      Computadores: [20, 18, 15, 10, 12, 16]
    }
  },
  vestuario: {
    Nike: {
      Chuteira: [10, 11, 7, 5, 4, 3],
      Bola: [7, 14, 18, 15, 8, 10],
      Camisa: [10, 12, 15, 8, 5, 9]
    },
    Adidas: {
      Short: [10, 12, 8, 6, 10, 7],
      Bermuda: [7, 4, 9, 8, 9, 10],
      Tenis: [10, 6, 7, 5, 10, 8]
    },
    Puma: {
      Meia: [15, 18, 12, 10, 11, 13],
      Bone: [8, 10, 6, 12, 13, 15],
      Camiseta: [12, 10, 15, 18, 11, 7]
    }
  },
  alimentos: {
    McDonalds: {
      BigMac: [5, 10, 8, 6, 11, 14],
      Batata: [12, 15, 10, 8, 9, 13],
      Nugget: [18, 11, 15, 12, 15, 14]
    },
    Starbucks: {
      Expresso: [10, 8, 12, 15, 6, 9],
      Cappuccino: [6, 5, 8, 10, 15, 11],
      Bolo: [15, 18, 4, 10, 9, 12]
    },
    CocaCola: {
      Suco: [9, 15, 8, 12, 15, 10],
      Refrigerante: [8, 10, 12, 15, 8, 11],
      Agua: [5, 6, 10, 8, 7, 5]
    }
  }
};

var selectCategoria = document.getElementById("selectCategoria");
var selectMarca = document.getElementById("selectMarca");
var selectProduto = document.getElementById("selectProduto");
var meuGrafico = null;

selectCategoria.addEventListener("change", function () {
  var categoriaSelecionada = selectCategoria.value;

  selectMarca.innerHTML = '<option value="">Selecione uma marca</option>';
  selectProduto.innerHTML = '<option value="">Selecione um produto</option>';

  if (categoriaSelecionada) {
    var marcas = Object.keys(dados[categoriaSelecionada]);
    marcas.forEach(function (marca) {
      var option = new Option(marca, marca);
      selectMarca.appendChild(option);
    });

    selectMarca.disabled = false;
  } else {
    selectMarca.disabled = true;
    selectProduto.disabled = true;
  }

  destroyChart();
});

selectMarca.addEventListener("change", function () {
  var categoriaSelecionada = selectCategoria.value;
  var marcaSelecionada = selectMarca.value;

  selectProduto.innerHTML = '<option value="">Selecione um produto</option>';

  if (marcaSelecionada) {
    var produtos = Object.keys(dados[categoriaSelecionada][marcaSelecionada]);
    produtos.forEach(function (produto) {
      var option = new Option(produto, produto);
      selectProduto.appendChild(option);
    });

    selectProduto.disabled = false;
  } else {
    selectProduto.disabled = true;
  }

  destroyChart();
});

selectProduto.addEventListener("change", function () {
  var categoriaSelecionada = selectCategoria.value;
  var marcaSelecionada = selectMarca.value;
  var produtoSelecionado = selectProduto.value;

  destroyChart();

  var ctx = document.getElementById("meuGrafico").getContext("2d");

  var dadosProduto = dados[categoriaSelecionada][marcaSelecionada][produtoSelecionado];

  meuGrafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
      datasets: [
        {
          label: produtoSelecionado,
          data: dadosProduto,
          backgroundColor: 'rgb(45, 56, 105)',
          borderWidth: 5,
          barPercentage: 0.7,
          categoryPercentage: 0.6,
          borderRadius: 10,
          hoverBackgroundColor: 'rgb(21, 27, 54)',
        }
      ]
    },
    options: {
      layout: {
        padding: 50
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 14,
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
});

function destroyChart() {
  if (meuGrafico) {
    meuGrafico.destroy();
  }
}

var select = document.getElementById('mySelect');

select.addEventListener('click', function () {
  select.classList.toggle('open');
});
