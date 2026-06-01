import pyautogui
import time

class BotDesktop:
    def __init__(self, confidence=0.9):
        self.confidence = confidence
        pyautogui.PAUSE = 0.5

    def aguardar(self, tempo: float):
        time.sleep(tempo)

    def abrir_programa(self, nome_programa: str):
        pyautogui.hotkey('win', 'r')
        self.aguardar(1)
        pyautogui.write(nome_programa, interval=0.1)
        self.aguardar(0.1)
        pyautogui.press('enter')

    def localizar_imagem(self, caminho_imagem: str):
        try:
            return pyautogui.locateCenterOnScreen(
                caminho_imagem,
                confidence=self.confidence
            )
        except Exception as e:
            print(f"Erro ao localizar imagem {caminho_imagem}: {e}")
            return None

    def clicar_em_imagem(self, caminho_imagem: str) -> bool:
        posicao = self.localizar_imagem(caminho_imagem)
        if posicao:
            pyautogui.click(posicao.x, posicao.y)
            return True
        return False

    def aguardar_imagem(self, caminho_imagem: str, timeout: float = 30, intervalo: float = 1):
        inicio = time.time()
        while time.time() - inicio < timeout:
            posicao = self.localizar_imagem(caminho_imagem)
            if posicao:
                return posicao
            time.sleep(intervalo)
        return None

    def localizar_todas_imagens(
        self,
        caminho_imagem: str,
        distancia_minima=20
    ):

     try:

         resultados = list(
             pyautogui.locateAllOnScreen(
                 caminho_imagem,
                 confidence=self.confidence
             )
         )

         centros = []

         for r in resultados:

             centro = pyautogui.center(r)

             duplicado = False

             for existente in centros:

                 dx = abs(
                     existente.x - centro.x
                 )

                 dy = abs(
                     existente.y - centro.y
                 )

                 if (
                     dx < distancia_minima
                     and
                     dy < distancia_minima
                 ):

                     duplicado = True
                     break

             if not duplicado:

                 centros.append(
                     centro
                 )

         return centros

     except Exception as e:

         print(e)

         return []


    def limpar_input(self):
        pyautogui.hotkey(
            "ctrl",
            "a"
        )

        self.aguardar(0.2)

        pyautogui.press(
            "backspace"
        )

        self.aguardar(0.2)


    def preencher_login_mesma_imagem(
        self,
        imagem_input: str,
        usuario: str,
        senha: str,
        timeout: int = 30,
        intervalo: float = 0.5
    ):

        inicio = time.time()

        while time.time() - inicio < timeout:

            inputs = self.localizar_todas_imagens(
                imagem_input
            )

            if len(inputs) >= 1:

                # ordena de cima para baixo
                inputs.sort(
                    key=lambda p: p.y
                )

                # CASO: apenas senha
                if len(inputs) == 1:

                    print(
                        "1 input encontrado -> senha"
                    )

                    campo = inputs[0]

                    pyautogui.click(
                        campo.x,
                        campo.y
                    )

                    self.limpar_input()

                    pyautogui.write(
                        senha,
                        interval=0.01
                    )

                    pyautogui.press(
                        "enter"
                    )

                    return True


                # CASO: usuario + senha
                else:

                    print(
                        f"{len(inputs)} inputs encontrados"
                    )

                    usuario_input = inputs[0]

                    senha_input = inputs[1]

                    # usuario

                    pyautogui.click(
                        usuario_input.x,
                        usuario_input.y
                    )

                    self.limpar_input()

                    pyautogui.write(
                        usuario,
                        interval=0.01
                    )

                    # senha

                    pyautogui.click(
                        senha_input.x,
                        senha_input.y
                    )

                    self.limpar_input()

                    pyautogui.write(
                        senha,
                        interval=0.01
                    )

                    pyautogui.press(
                        "enter"
                    )

                    return True

            time.sleep(
                intervalo
            )

        print(
            "Timeout esperando inputs"
        )

        return False

    def apertar_teclas(self, teclas, vezes: int = 1, intervalo: float = 0.2):
        if isinstance(teclas, str):
            pyautogui.press(teclas, presses=vezes, interval=intervalo)
        else:
            for _ in range(vezes):
                pyautogui.hotkey(*teclas)
                self.aguardar(intervalo)

    def focar_janela(self, titulo_janela: str) -> bool:
        try:
            janelas = pyautogui.getWindowsWithTitle(titulo_janela)

            if janelas:
                janela = janelas[0]

                if janela.isMinimized:
                    janela.restore()

                try:
                    janela.activate()
                except Exception:
                    janela.maximize()

                self.aguardar(1)
                return True

            print(f"Atenção: A janela contendo '{titulo_janela}' não foi encontrada.")
            titulos_abertos = [j.title for j in pyautogui.getAllWindows() if j.title.strip()]
            print(f"Algumas janelas visíveis no momento: {titulos_abertos[:4]}")
            return False

        except Exception as e:
            print(f"Erro severo ao focar na janela: {e}")
            return False