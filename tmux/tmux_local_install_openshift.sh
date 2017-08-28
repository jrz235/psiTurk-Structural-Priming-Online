set -e
TMUX_VERSION=1.9
mkdir -p $OPENSHIFT_DATA_DIR/local $OPENSHIFT_DATA_DIR/tmux_tmp
cd $OPENSHIFT_DATA_DIR/tmux_tmp
wget -O tmux-${TMUX_VERSION}.tar.gz http://sourceforge.net/projects/tmux/files/tmux/tmux-${TMUX_VERSION}/tmux-${TMUX_VERSION}.tar.gz/download
wget https://github.com/downloads/libevent/libevent/libevent-2.0.19-stable.tar.gz
wget ftp://ftp.gnu.org/gnu/ncurses/ncurses-5.9.tar.gz
tar xvzf libevent-2.0.19-stable.tar.gz
cd libevent-2.0.19-stable
./configure --prefix=$OPENSHIFT_DATA_DIR/local --disable-shared
make
make install
cd ..
tar xvzf ncurses-5.9.tar.gz
cd ncurses-5.9
./configure --prefix=$OPENSHIFT_DATA_DIR/local
make
make install
cd ..
tar xvzf tmux-${TMUX_VERSION}.tar.gz
cd tmux-${TMUX_VERSION}
./configure CFLAGS="-I$OPENSHIFT_DATA_DIR/local/include -I$OPENSHIFT_DATA_DIR/local/include/ncurses" LDFLAGS="-L$OPENSHIFT_DATA_DIR/local/lib -L$OPENSHIFT_DATA_DIR/local/include/ncurses -L$OPENSHIFT_DATA_DIR/local/include"
CPPFLAGS="-I$OPENSHIFT_DATA_DIR/local/include -I$OPENSHIFT_DATA_DIR/local/include/ncurses" LDFLAGS="-static -L$OPENSHIFT_DATA_DIR/local/include -L$OPENSHIFT_DATA_DIR/local/include/ncurses -L$OPENSHIFT_DATA_DIR/local/lib" make
cp tmux $OPENSHIFT_DATA_DIR/local/bin
cd ..
rm -rf $OPENSHIFT_DATA_DIR/tmux_tmp