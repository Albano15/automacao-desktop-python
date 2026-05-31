import pyautogui
import time

class BotDesktop:
    def __init__(self, confidence=0.8):
        self.confidence = confidence
        pyautogui.PAUSE = 0.5

    def aguardar(self, tempo: float):
        """Pausa a execução do script pelo tempo especificado em segundos."""
        time.sleep(tempo)

    def abrir_programa(self, nome_programa: str):
        """Abre a janela 'Executar' (Win+R), digita o nome e aperta Enter com tempo de digitação."""
        pyautogui.hotkey('win', 'r')
        self.aguardar(1)
        # O parâmetro interval=0.1 faz o bot digitar uma letra a cada 0.1s (evita engasgos do Windows)
        pyautogui.write(nome_programa, interval=0.1)
        self.aguardar(0.5)
        pyautogui.press('enter')

    def clicar_em_imagem(self, caminho_imagem: str) -> bool:
        try:
            posicao = pyautogui.locateCenterOnScreen(caminho_imagem, confidence=self.confidence)
            if posicao:
                pyautogui.click(posicao.x, posicao.y)
                return True
            return False
        except pyautogui.ImageNotFoundException:
            return False
        except Exception as e:
            print(f"Erro inesperado ao procurar imagem: {e}")
            return False

    def apertar_teclas(self, teclas, vezes: int = 1, intervalo: float = 0.2):
        """
        Aperta teclas. O parâmetro 'intervalo' garante o tempo necessário
        para o sistema operacional registrar cada pressionamento.
        """
        if isinstance(teclas, str):
            # Se for uma tecla única, press já aceita 'presses' e 'interval'
            pyautogui.press(teclas, presses=vezes, interval=intervalo)
        else:
            # Se for combinação em lista
            for _ in range(vezes):
                pyautogui.hotkey(*teclas)
                self.aguardar(intervalo)

    def focar_janela(self, titulo_janela: str) -> bool:
        """
        Tenta focar na janela. Possui contorno para bloqueios do Windows.
        """
        try:
            janelas = pyautogui.getWindowsWithTitle(titulo_janela)
            
            if janelas:
                janela = janelas[0]
                
                if janela.isMinimized:
                    janela.restore()
                
                # Às vezes o Windows bloqueia a ativação direta, 
                # a função abaixo tenta forçar o foco.
                try:
                    janela.activate()
                except Exception as ex:
                    # Se o Windows bloquear, tentamos maximizar para forçar o plano principal
                    janela.maximize() 
                
                self.aguardar(1) # Dá 1 segundo para a animação da janela terminar
                return True
                
            # Se não achar, imprime os títulos abertos para te ajudar a debugar
            print(f"Atenção: A janela contendo '{titulo_janela}' não foi encontrada.")
            titulos_abertos = [j.title for j in pyautogui.getAllWindows() if j.title.strip()]
            print(f"Algumas janelas visíveis no momento: {titulos_abertos[:4]}")
            return False
            
        except Exception as e:
            print(f"Erro severo ao focar na janela: {e}")
            return False