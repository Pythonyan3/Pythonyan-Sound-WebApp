<template>
  <div class="home">
    <!--HEADER-->
    <header class="header">
        <div class="container">
            <div class="header__inner">
                <router-link :to="{name: 'Main'}">
                    <div class="header__logo">
                        <img class="header__logo__icon" src="../assets/images/snake_logo.png" alt="">
                        <span class="header__logo__text">Pythonyan Sound</span>
                    </div>
                </router-link>

                <div class="header__navbar">
                  <router-link :to="{name: 'Signup'}" class="navbar__item"> Sign Up </router-link>
                  <router-link :to="{name: 'Login'}" class="navbar__item"> Log In </router-link>
                </div>
            </div>
        </div>
    </header>

    <div class="under__header__plug"></div>
    
    <router-view/>

    <!--FOOTER-->
    <footer class="footer">
        <div class="container">
            <div class="footer__inner">
                <a href="">
                    <div class="header__logo">
                        <span class="header__logo__text">Pythonyan Sound</span>
                    </div>
                </a>

                <div class="footer__links">
                  <div class="footer__links__title">Project</div>

                  <router-link :to="{name: 'About'}" class="footer__link__item">About</router-link>
                </div>

                <div class="footer__links">
                    <div class="footer__links__title">useful links</div>

                    <a class="footer__link__item" href="">Support</a>
                    <a class="footer__link__item" href="">Web Player</a>
                    <a class="footer__link__item" href="">Free App</a>
                </div>

                <div class="footer__socials">
                    <a href="https://vk.com/pythonyan3">
                        <div class="footer__social__item">
                            <span class="social__item__icon fab fa-vk fa-2x"></span>
                        </div>
                    </a>
                    <a href="https://t.me/Pythonyan3">
                        <div class="footer__social__item">
                            <span class="social__item__icon fab fa-telegram-plane fa-2x"></span>
                        </div>
                    </a>
                    <a href="https://github.com/Pythonyan3">
                        <div class="footer__social__item">
                            <span class="social__item__icon fab fa-github fa-2x"></span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>


<style scoped>

body{
  display: flex;
  flex-direction: column;
}
.container{
	position: relative;
	width: 100%;
	max-width: 1185px;
  margin: 0 auto;
  padding: 0 15px 0 15px;
}

.header{
  position: fixed;
	left: 0;
  top: 0;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.8);
  z-index: 3;
  flex: 1 0 auto;
}

.header__inner{
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.header__logo{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header__logo:hover .header__logo__text{
  color:#ffa1bd;
}

.header__logo__text{
  font-size: 1.5rem;
  transition: 0.3s;
}


.header__logo__icon{
  max-width: 80px;
  max-width: 80px;
}

.header__navbar{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.navbar__item{
  text-align: center;
  padding: 28px 25px 28px 20px;
}

.navbar__item:hover{
  color:#ffa1bd;
}

.under__header__plug{
    width: 100%;
    height: 80px;
    background-color: black;
}

/* FOOTER STYLES */
.footer{
  width: 100%;
  padding: 80px 0 45px 0;
  flex-shrink: 0;
  background-color: black;
}

.footer__inner{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.footer__links{
  display: flex;
  flex-direction: column;
}

.footer__links__title{
  margin: 10px 0 20px 0;
  color: #919496;
  text-transform: uppercase;
}

.footer__link__item{
  margin: 0 0 15px;
}

.footer__link__item:hover{
  color: #ffa1bd;
}

.footer__socials{
  display: flex;
  flex-direction: row;
}

.footer__social__item{
  width: 54px;
  height: 54px;
  margin-left: 25px;
  line-height: 65px;
  text-align: center;
  border-radius: 50px;
  background-color: #222326;
  transition: 0.3;
}

.footer__social__item:hover .social__item__icon{
  color:#ffa1bd;
}
</style>