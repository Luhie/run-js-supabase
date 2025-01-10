## /config
* 역할: 애플리케이션의 설정 파일이나 환경 변수 설정을 포함하는 디렉터리입니다. 환경에 따라 구체적인 설정을 관리할 수 있습니다.
* 조언: 환경 변수 파일 (.env)이나 JSON, YAML 형식의 설정 파일을 이곳에 두는 것이 좋습니다. 예를 들어, 데이터베이스 연결 정보나 API 키 등을 설정 파일로 관리할 수 있습니다.

## /internal
### /controller
* 역할: 요청을 처리하고, 서비스 계층과 뷰 계층을 연결하는 컨트롤러 코드입니다.
조언: viewProcess.go와 같은 파일명이 특정 기능을 정확히 나타내지 않으므로, UserController.go, OrderController.go처럼 역할에 맞는 이름을 사용하는 것이 좋습니다. 또한, 컨트롤러가 비즈니스 로직을 직접적으로 처리하지 않도록 하고, 서비스 계층에 위임하는 구조로 작성하는 것이 좋습니다.

### /service
* 역할: 비즈니스 로직을 담당하는 계층으로, 데이터베이스와 외부 API와의 통신을 처리합니다.
* 조언: supabase.go 파일은 Supabase와 관련된 API 통신을 다루는 서비스 코드로 보입니다. 이와 같은 서비스 파일은 특정 서비스와 관련된 기능만 다루는 것이 좋습니다. 예를 들어, supabase.go가 아니라 supabaseService.go라는 이름을 사용할 수 있습니다. 또한, 각 서비스는 명확한 인터페이스를 제공하고, 다른 서비스와 결합할 수 있는 구조로 만드는 것이 좋습니다.

## /web
* 역할: 애플리케이션의 프론트엔드 자원(정적 파일과 템플릿)을 관리하는 디렉터리입니다.

### /static
* 역할: 정적 파일(JS, CSS, 이미지 등)을 포함하는 디렉터리입니다.
* 조언: JS와 CSS는 일반적으로 assets 디렉터리 내에 두고, 그 안에 더 세부적으로 js와 css 디렉터리를 분리하는 방식이 좋습니다. 이를 통해 다른 종류의 정적 자원을 구별할 수 있습니다.

### /templates
* 역할: HTML 템플릿 파일을 포함하는 디렉터리입니다.
* 조언: 템플릿 파일은 애플리케이션의 뷰를 렌더링하는 데 사용됩니다. 템플릿 파일의 이름은 해당 기능을 명확히 반영하는 것이 좋습니다. 예를 들어, userTemplate.gohtml, orderTemplate.gohtml처럼 관련된 기능을 이름에 반영하는 방식으로 구성할 수 있습니다.

## Structure
/config
  config.go
  config.json
/internal
  /controller
    userController.go
    orderController.go
  /service
    supabaseService.go
    userService.go
    orderService.go
  /controller/test
    userController_test.go
  /service/test
    supabaseService_test.go
/web
  /static
    /js
      main.js
    /css
      style.css
    /images
      logo.png
  /templates
    userTemplate.gohtml
    orderTemplate.gohtml
