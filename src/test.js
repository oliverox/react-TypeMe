import React from 'react';
import { render, cleanup } from 'react-testing-library';
import TypeMe from './index';
import Text from './Text';

let div;

afterEach(() => {
  document.body.removeChild(div);
  div = null;
  cleanup();
});

// Unit tests for <Text />

describe('<Text /> component', () => {
  // render string passed as children
  it('<Text/> renders text passed as children', done => {
    new Promise(resolve => {
      const { container } = render(
        <Text
          onAnimationEnd={() => {
            resolve();
          }}
        >
          Hello!
        </Text>
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
    });
  });

  // onAnimationEnd callback executed once successfully
  it(`<Text/> onAnimationEnd callback executed once successfully`, done => {
    let cb;
    new Promise(resolve => {
      cb = jest.fn(() => {
        resolve();
      });
      const { container } = render(<Text onAnimationEnd={cb}>Hello!</Text>);
      div = container;
    }).then(() => {
      done();
      expect(cb).toHaveBeenCalledTimes(1);
      expect(div).toMatchSnapshot();
      cb = null;
    });
  });

  // delete characters
  it('<Text/> renders text with deleted characters', done => {
    new Promise(resolve => {
      const { container } = render(
        <Text
          deleteCharacters={7}
          onAnimationEnd={() => {
            resolve();
          }}
        >
          Hello world!
        </Text>
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
    });
  });

  // add lineBreak after render
  it('<Text/> renders with a line break character', done => {
    new Promise(resolve => {
      const { container } = render(
        <Text
          lineBreak={true}
          onAnimationEnd={() => {
            resolve();
          }}
        >
          Line break?
        </Text>
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
    });
  });

  // trigger startAnimation manually
  it('<Text/> with manually triggered start animation', done => {
    new Promise(resolve => {
      const { container, rerender } = render(
        <Text startAnimation={false}>Nope</Text>
      );
      setTimeout(() => {
        rerender(
          <Text
            startAnimation={true}
            onAnimationEnd={() => {
              resolve();
            }}
          >
            Yes
          </Text>
        );
      }, 500);
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
    });
  });

  // change default cursor
  it('<Text/> renders with new cursor character', done => {
    new Promise(resolve => {
      const { container } = render(
        <Text
          cursorCharacter="_"
          onAnimationEnd={() => {
            resolve();
          }}
        >
          New cursor?
        </Text>
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
    });
  });

  // hide cursor after animation
  it('<Text/> hides cursor after animation', done => {
    new Promise(resolve => {
      const { container } = render(
        <Text
          hideCursor={true}
          onAnimationEnd={() => {
            resolve();
          }}
        >
          Cursor hidden?
        </Text>
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
    });
  });

  // keep cursor after animation
  it('<Text/> keep cursor after animation', done => {
    new Promise(resolve => {
      const { container } = render(
        <Text
          hideCursor={false}
          onAnimationEnd={() => {
            resolve();
          }}
        >
          Cursor hidden?
        </Text>
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
    });
  });
});

/* 
<TypeMe />
  - renders without crashing
  - onAnimationEnd called once when animation ends
  - renders with string passed as children
  - renders with string passed as props
  - renders multiple instances 
  - animationEnd callback executed once successfully
*/

describe('<TypeMe /> component', () => {
  // renders without crashing
  it('<TypeMe/> renders without crashing', done => {
    const { container } = render(<TypeMe />);
    setTimeout(() => {
      div = container;
      expect(div).toMatchSnapshot();
      done();
    }, 1000);
  });

  it('<TypeMe/> onAnimationEnd called once when animation ends', done => {
    let cb;
    new Promise(resolve => {
      cb = jest.fn(() => {
        resolve();
      });
      const { container } = render(<TypeMe onAnimationEnd={cb}>Hello!</TypeMe>);
      div = container;
    }).then(() => {
      done();
      expect(cb).toHaveBeenCalledTimes(1);
      expect(div).toMatchSnapshot();
    });
  });
  // it('<TypeMe/> renders with string passed as children', done => {
  //   const { container } = render(<TypeMe />);
  //   setTimeout(() => {
  //     div = container;
  //     expect(div).toMatchSnapshot();
  //     done();
  //   }, 1000);
  // })

  // // renders multiple instances
  // it('<TypeMe/> renders multiple instances', done => {
  //   const { container } = render(<TypeMe />);
  //   setTimeout(() => {
  //     div = container;
  //     expect(div).toMatchSnapshot();
  //     done();
  //   }, 1000);
  // })
});
