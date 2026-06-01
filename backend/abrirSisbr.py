from dotenv import load_dotenv
import os

from utils.bot_desktop import BotDesktop

load_dotenv()

def main():

    usuario = os.getenv("SISBR_USUARIO")
    senha = os.getenv("SISBR_SENHA")

    bot = BotDesktop(confidence=0.9)

    print("Abrindo Sisbr...")

    bot.abrir_programa(
        r"C:\Sisbr 2.0\Sisbr 2.0.exe"
    )

    bot.aguardar(3)

    print("Aguardando login...")

    bot.preencher_login_mesma_imagem(
        imagem_input=r"./images/input_branco.png",
        usuario=usuario,
        senha=senha
    )


if __name__ == "__main__":
    main()