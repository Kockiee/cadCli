var jsonUser = "";
function Login(usuario, senha){
    var http = new XMLHttpRequest();
    var url = "http://localhost:8081/oneuser/?id=1";
    http.open('GET', url, true);
    http.setRequestHeader('accept', 'application/json');
    http.setRequestHeader('Accept-Encoding', 'gzip, deflate, br');
    http.setRequestHeader('Accept-Language', 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7');
    http.setRequestHeader('Connection', 'keep-alive');
    http.setRequestHeader('Referer', 'http://localhost:8081/docs');
    http.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36');
    http.onreadystatechange = function(){
        if (http.readyState == 4 && http.status == 200){
            jsonUser = JSON.parse(http.responseText);
        }
    }
    http.send();
}

function Cadastrar(usuario, senha){
    var http = new XMLHttpRequest();
    var url = "http://localhost:8081/insertuser/";
    var params = "{\"nome_usuario\":\"" + usuario + "\",\"senha\":\"" + senha + "\"}";
    http.open('POST', url, true);
    http.setRequestHeader('Connection', 'keep-alive');
    http.setRequestHeader('accept', 'application/json');
    http.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Safari/537.36');
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('Origin', 'http://localhost:8081');
    http.setRequestHeader('Referer', 'http://localhost:8081/docs');
    http.setRequestHeader('Accept-Encoding', 'gzip, deflate, br');
    http.setRequestHeader('Accept-Language', 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7');
    http.onreadystatechange = function(){
        if (http.readyState == 4 && http.status == 200){
            jsonUser = JSON.parse(http.responseText);
        }
    }
    http.send(params);
}

function Deletar(id){
    var http = new XMLHttpRequest();
    var url = "http://localhost:8081/deleteuser/?id=" + id;
    http.open('GET', url, true);
    http.setRequestHeader('Accept-Encoding', 'gzip, deflate, br');
    http.setRequestHeader('Accept-Language', 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7');
    http.setRequestHeader('Referer', 'http://localhost:8081/docs');
    http.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36');
    http.onreadystatechange = function(){
        if (http.readyState == 4 && http.status == 200){
            jsonUser = JSON.parse(http.responseText);
        }
    }
    http.send();
}

function Update(usuario, senha){
    var http = new XMLHttpRequest();
    var url = "http://localhost:8081/updateuser/?nu=" + usuario + "&senha=" + senha;
    http.open('GET'. url, true);
    http.setRequestHeader('Accept-Encoding', 'gzip, deflate, br');
    http.setRequestHeader('Accept-Language', 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7');
    http.setRequestHeader('Referer', 'http://localhost:8081/docs');
    http.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36');
    http.onreadystatechange = function(){
        if (http.readyState == 4 && http.status == 200){
            jsonUser = JSON.parse(http.responseText);
        }
    }
    http.send();
}

function Limpar(){
    let txtusername = window.document.getElementById('username')
    let txtpassword = window.document.getElementById('password')
    txtusername.innerText = ""
    txtpassword.innerText = ""
}

function InserirProduto(descricao_produto, quantidade_em_estoque, valor_unitario, dia_de_entrada_em_estoque, marca){
    var http = new XMLHttpRequest();
    var url = "http://localhost:8081/insertproduct/";
    var params = "{\"descricao_produto\": \"" + descricao_produto + "\",\"quantidade_em_estoque\": " + quantidade_em_estoque + ",\"valor_unitario\": " + valor_unitario + ",\"dia_de_entrada_em_estoque\": \"" + dia_de_entrada_em_estoque + "\",\"marca\": \"" + marca + "\"}";
    http.open('POST', url, true);
    http.setRequestHeader('Connection', 'keep-alive');
    http.setRequestHeader('accept', 'application/json');
    http.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36');
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader('Referer', 'http://localhost:8081/docs');
    http.setRequestHeader('Accept-Encoding', 'gzip, deflate, br');
    http.setRequestHeader('Accept-Language', 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7');
    http.onreadystatechange = function(){
        if (http.readyState == 4 && http.status == 200){
            jsonUser = JSON.parse(http.responseText);
        }
    }
    http.send();
}

function DeletarProduto(id_produto){
    var http = new XMLHttpRequest();
    var url = "http://localhost:8081/deleteproduct/?id_produto=" + id_produto;
    http.open('GET', url, true);
    http.setRequestHeader('Accept-Encoding', 'gzip, deflate, br');
    http.setRequestHeader('Accept-Language', 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7');
    http.setRequestHeader('Referer', 'http://localhost:8081/docs');
    http.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36');
    http.onreadystatechange = function(){
        if (http.readyState == 4 && http.status == 200){
            jsonUser = JSON.parse(http.responseText);
        }
    }
    http.send();
}    

function AtualizarProduto(id_produto, descricao_produto, quantidade_em_estoque, valor_unitario){
    var http = new XMLHttpRequest();
    var url = "http://localhost:8081/updateproduct/?id_produto=" + id_produto + "&descricao_produto=" + descricao_produto + "&quantidade_em_estoque=" + quantidade_em_estoque + "&valor_unitario=" + valor_unitario;
    http.open('GET'. url, true);
    http.setRequestHeader('Accept-Encoding', 'gzip, deflate, br');
    http.setRequestHeader('Accept-Language', 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7');
    http.setRequestHeader('Referer', 'http://localhost:8081/docs');
    http.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36');
    http.onreadystatechange = function(){
        if (http.readyState == 4 && http.status == 200){
            jsonUser = JSON.parse(http.responseText);
        }
    }
    http.send();
}

function SelecionarProduto(id_produto){
    var http = new XMLHttpRequest();
    var url = "http://localhost:8081/oneproduct/?id_produto=" + id_produto;
    http.open('GET'. url, true);
    http.setRequestHeader('accept', 'application/json');
    http.setRequestHeader('Accept-Encoding', 'gzip, deflate, br');
    http.setRequestHeader('Accept-Language', 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7');
    http.setRequestHeader('Connection', 'keep-alive');
    http.setRequestHeader('Referer', 'http://localhost:8081/docs');
    http.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36');
    http.onreadystatechange = function(){
        if (http.readyState == 4 && http.status == 200){
            jsonUser = JSON.parse(http.responseText);
        }
    }
    http.send();
}